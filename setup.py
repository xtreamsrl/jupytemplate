from setuptools import setup

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name='jupyter-template',
    version='0.5.1',
    packages=[''],
    url='',
    license='MIT licence',
    author='Emanuele Fabbiani',
    author_email='donlelef@gmail.com',
    description='Jupyter extension to support templates',
    long_description=long_description,
    long_description_content_type="text/markdown",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ]
)
