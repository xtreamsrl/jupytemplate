from setuptools import setup, find_packages

import jupytemplate

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name='jupytemplate',
    version=jupytemplate.__version__,
    packages=find_packages(),
    url='',
    license='MIT licence',
    author='Emanuele Fabbiani',
    author_email='donlelef@gmail.com',
    description='Jupyter extension to support templates',
    long_description=long_description,
    long_description_content_type="text/markdown",
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        'Development Status:: 3 - Alpha',
        'Intended Audience :: End Users/Desktop',
        'Intended Audience :: Science/Research',
        "License :: OSI Approved :: MIT License",
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3',
        'Topic :: Utilities',
    ]
)
