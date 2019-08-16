import os

import jupytemplate


def test_template_path_is_correct():
    actual_path = jupytemplate.get_template_path()
    expected_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), '..', 'jupytemplate', 'jupytemplate', 'template.ipynb')
    )
    assert actual_path == expected_path
