define(['require', 'jquery', 'base/js/namespace', 'base/js/events'],
    function (requirejs, $, Jupyter, JupyterEvents) {
        "use strict";

        class CellContent {
            constructor(cell_type, content) {
                this.cell_type = cell_type;
                this.content = content;
            }
        }

        const intro_text = new CellContent('markdown',
            `# Title
The title of the notebook should be coherent with file name. Namely, file name should be:    
*author's initials_progressive number_title.ipynb*    
For example:    
*EF_01_Data Exploration.ipynb*

## Purpose
State the purpose of the notebook.

## Methodology
Quickly describe assumptions and processing steps.

## WIP - improvements
Use this section only if the notebook is not final.

Notable TODOs:
- todo 1;
- todo 2;
- todo 3.

## Results
Describe and comment the most important results.

## Suggested next steps
State suggested next steps, based on results obtained in this notebook.`
        );

        const setup_library_text = new CellContent('markdown',
            `# Setup

## Library import
We import all the required Python libraries`
        );

        const setup_library_snippet = new CellContent('code',
            `# Data manipulation
import pandas as pd
import numpy as np

# Options for pandas
pd.options.display.max_columns = 50
pd.options.display.max_rows = 30

# Visualizations
import plotly
import plotly.graph_objs as go
import plotly.offline as ply
plotly.offline.init_notebook_mode(connected=True)

import cufflinks as cf
cf.go_offline(connected=True)
cf.set_config_file(theme='white')

import matplotlib as plt

# Autoreload extension
if 'autoreload' not in get_ipython().extension_manager.loaded:
    %load_ext autoreload
    
%autoreload 2`
        );

        const setup_local_library_text = new CellContent('markdown',
            `## Local library import
We import all the required local libraries libraries`
        );

        const setup_local_library_snippet = new CellContent('code',
            `# Include local library paths
import sys
# sys.path.append('path/to/local/lib') # uncomment and fill to import local libraries

# Import local libraries`
        );

        const parameter_text = new CellContent('markdown',
            `# Parameter definition
We set all relevant parameters for our notebook. By convention, parameters are uppercase, while all the 
other variables follow Python's conventions.`
        );

        const data_import_text = new CellContent('markdown',
            `
# Data import
We retrieve all the required data for the analysis.`
        );

        const data_processing_text = new CellContent('markdown',
            `# Data processing
Put here the core of the notebook. Feel free di further split this section into subsections.`
        );

        const reference_text = new CellContent('markdown',
            `# References
We report here relevant references:
1. author1, article1, journal1, year1, url1
2. author2, article2, journal2, year2, url2`
        );

        // define default values for config parameters
        let params = {
            insert_template_on_creation: true,
            ask_title_change_if_untitled: true
        };

        const add_sections = function () {
            const section_templates = [
                intro_text,
                setup_library_text,
                setup_library_snippet,
                setup_local_library_text,
                setup_local_library_snippet,
                parameter_text,
                data_import_text,
                data_processing_text,
                reference_text
            ];

            section_templates.forEach(function (item, index) {
                Jupyter.notebook.insert_cell_at_index(item.cell_type, index).set_text(item.content);
            });
        };

        // Prompts user to enter name for notebook
        const prompt_name = function () {
            // Open rename notebook box if 'Untitled' in name
            if (Jupyter.notebook.notebook_name.includes('Untitled')) {
                document.getElementsByClassName('filename')[0].click();
            }
        };

        const initialize = function () {
            // update params with any specified in the server's config file.
            // the "thisextension" value of the Jupyter notebook config's
            // data may be undefined, but that's ok when using JQuery's extend
            $.extend(true, params, Jupyter.notebook.config.data.xtream_template);

            // add our extension's css to the page
            $('<link/>')
                .attr({
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: requirejs.toUrl('./xtream_template.css')
                })
                .appendTo('head');

            // add sections to the notebook
            console.log(params);
            if (Jupyter.notebook.get_cells().length === 1 && params.insert_template_on_creation) {
                add_sections();
            }

            if (params.ask_title_change_if_untitled) {
                // Run when cell is executed
                JupyterEvents.on('execute.CodeCell', prompt_name);

                // Run when notebook is saved
                JupyterEvents.on('before_save.Notebook', prompt_name);
            }
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
