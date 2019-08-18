log_prefix = '[jupytemplate] ';

define(['require', 'jquery', 'base/js/namespace', 'base/js/events'],
    function (require, $, Jupyter, JupyterEvents) {
        "use strict";

        // define default values for config parameters
        let params = {
            insert_template_on_creation: true,
            ask_title_change_if_untitled: true
        };

        const add_sections = function () {
            const template_path = Jupyter.notebook.base_url + 'nbextensions/jupytemplate/template.ipynb';
            $.getJSON(template_path, json => {
                let cells = json['cells'];
                cells.forEach((item, index) => {
                    Jupyter.notebook.insert_cell_at_index(item['cell_type'], index).set_text(item['source'].join(''));
                });
            });
        };

        // Prompts user to enter name for notebook
        const prompt_name = function () {
            // Open rename notebook box if 'Untitled' in name
            if (Jupyter.notebook.notebook_name.includes('Untitled')) {
                document.getElementsByClassName('filename')[0].click();
            }
        };

        // define action, register with ActionHandler instance
        const prefix = 'auto';
        const action_name = 'inset-template-cells';
        const action = {
            icon: 'fa-file-text-o',
            help: 'Insert template cells at the beginning of the notebook',
            help_index: 'zz',
            id: 'insert_template_cells',
            handler: add_sections
        };

        const initialize = function () {
            // update params with any specified in the server's config file.
            // the "thisextension" value of the Jupyter notebook config's
            // data may be undefined, but that's ok when using JQuery's extend
            $.extend(true, params, Jupyter.notebook.config.data.template);

            // add our extension's css to the page
            $('<link/>')
                .attr({
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: require.toUrl('./template.css')
                })
                .appendTo('head');

            // Add sections to the notebook and run all
            if (Jupyter.notebook.ncells() === 1 && params.insert_template_on_creation) {
                console.log(log_prefix + 'Configuration read: adding template cells');
                add_sections();
                if (Jupyter.notebook.kernel && Jupyter.notebook.trusted &&
                    Jupyter.notebook.kernel.info_reply.status === 'ok') {
                    console.log(log_prefix + 'Kenerl ready: executing cells');
                    Jupyter.notebook.execute_all_cells();
                } else {
                    console.log(log_prefix + 'Kenerl not ready: scheduling event');
                    Jupyter.notebook.events.one('kernel_ready.Kernel', () => {
                        console.log(log_prefix + 'Event triggered: running cells');
                        Jupyter.notebook.execute_all_cells();
                    })
                }
            }

            if (params.ask_title_change_if_untitled) {
                // Run when notebook is saved
                JupyterEvents.on('before_save.Notebook', prompt_name);
            }

            // register actions with ActionHandler instance
            let action_full_name = Jupyter.keyboard_manager.actions.register(action, action_name, prefix);

            // create toolbar button
            Jupyter.toolbar.add_buttons_group([action_full_name]);
        };

        // The specially-named function load_ipython_extension will be called
        // by the notebook when the nbextension is to be loaded.
        // It mustn't take too long to execute however, or the notebook will
        // assume an error has occurred.
        const load_ipython_extension = function () {
            // Once the config has been loaded, do everything else.
            // The loaded object is a javascript Promise object, so the then
            // call return immediately. See
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
            // for details.
            return Jupyter.notebook.config.loaded.then(initialize);
        };

        // return object to export public methods
        return {
            load_ipython_extension: load_ipython_extension
        };
    }
);
