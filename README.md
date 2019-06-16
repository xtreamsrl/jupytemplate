# Jupyter template

A simple template for jupyter notebooks.

The extension sets up any new Jupyter Notebook 
with a conventional and general-purpose
template to shape Data Science analysis.

The template includes conventional sections,
like *Data Import*, *Processing* and *References*,
as well as code to perform common operations, like
importing and configuring charting libraries. 

Moreover, it prompts for a notebook name. 
Quite annoyingly. But don't worry, you can disable
this one.

## Motivation
Jupyter notebooks are awesome tools: they enable fast 
prototyping and ease result sharing. However, due to 
their flexibility, they are prone to be abused. 

In order to help Data Scientist keep their notebooks 
clean, a reasonably flexible yet conventional template
may help. Moreover, such a template may be also a 
productivity tool, which speeds up common setup,
such as library import.

## Quick start
You can install the extension using pip.

It is not mandatory, but it is strongly recommended to 
install the full set of jupyter extensions before 
installing this package:
```shell
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
```
Feel free to visit [the repository](https://github.com/ipython-contrib/jupyter_contrib_nbextensions)
for more information.

First, you have to install the package:
```shell
pip install jupyter-template
```
Then, you have to install the javascript files from 
the Python package in a conventional jupyter directory:
```shell
jupyter nbextension install --py template
```
Finally, you may want to enable the extension:
```shell
jupyter nbextension enable template/main
```
You can easily enable, disable or configure the extension
by using the [jupyter_nbextensions_configurator](https://github.com/Jupyter-contrib/jupyter_nbextensions_configurator)
server extension.

## For contributors
Install the virtual environment by running:
```shell
pipenv install
```
    
Please follow these steps to get the extension up and 
running:
1. Locate your jupyter extensions root folder - if you are
using a virtual environment, it should be in 
*<venv_root>/Lib/site-packages/jupyter_contrib_nbextensions/nbextensions*
2. Copy the folder template in this repository
into the jupyter extensions root folder
3. Update the extensions by running: 
    ```shell
    jupyter contrib nbextensions install
    ```
This is it. You're ready to go!

## References
Please consider reading the following resources for
a more comprehensive understanding:
- Will Kohersen, [Set Your Jupyter Notebook up Right with this Extension](https://towardsdatascience.com/set-your-jupyter-notebook-up-right-with-this-extension-24921838a332)
- Will Kohersen, [How to Write a Jupyter Notebook Extension](https://towardsdatascience.com/how-to-write-a-jupyter-notebook-extension-a63f9578a38c)
- Will Kohersen, [Setup extension](https://github.com/WillKoehrsen/Data-Analysis/tree/master/setup)