from setuptools import setup, find_packages

import jupytemplate

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name='jupytemplate',
    version=jupytemplate.__version__,
    packages=find_packages(),
    url='https://github.com/xtreamsrl/jupytemplate',
    download_url=f'https://github.com/xtreamsrl/jupytemplate/archive/v{jupytemplate.__version__}.tar.gz',
    license='MIT licence',
    author='Emanuele Fabbiani @ xtream',
    author_email='donlelef@gmail.com',
    description='Jupyter extension to support templates',
    long_description=long_description,
    long_description_content_type="text/markdown",
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'ipython_genutils',
        'jupyter_core',
        'jupyter_nbextensions_configurator >=0.4.0',
        'notebook >=5.0',
    ],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: End Users/Desktop',
        'Intended Audience :: Science/Research',
        "License :: OSI Approved :: MIT License",
        'Natural Language :: English',
        'Operating System :: OS Independent',
        'Programming Language :: JavaScript',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.6',
        'Topic :: Utilities',
    ]
)
