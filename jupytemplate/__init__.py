import os

__version__ = '0.3.0'


def _jupyter_nbextension_paths():
    # src & dest are os paths, and so must use os.path.sep to work correctly on Windows.
    # In contrast, require is a requirejs path, and thus must use `/` as the path separator.
    return [dict(
        section='notebook',
        # src is relative to current module
        src='jupytemplate',
        # dest directory is in the `nbextensions/` namespace
        dest='jupytemplate',
        # require is also in the `nbextensions/` namespace
        # must use / as path.sep
        require='jupytemplate/main',
    )]


def get_template_path():
    """
    Get absolute path of template notebook.
    :return: the path if the template notebook
    """
    return os.path.abspath(os.path.join(os.path.dirname(__file__), 'jupytemplate', 'template.ipynb'))
