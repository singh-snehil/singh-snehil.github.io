# The HCX Protocol Website documentation

This repository contains the assets required to build the [HCX website](https://singh-snehil.github.io/). We're glad that you want to contribute!

## Using this repository

You can run the website locally using Hugo (Extended version), or you can run it in a container runtime.

## Prerequisites

To use this repository, you need the following installed locally:

- [npm](https://www.npmjs.com/)
- [Go](https://golang.org/)
- [Hugo (Extended version)](https://gohugo.io/)
- A container runtime, like [Docker](https://www.docker.com/).

Before you start, install the dependencies. Clone the repository and navigate to the directory:

```bash
git clone https://github.com/singh-snehil/hcx.git
cd hcx
```

The HCX website uses the [Docsy Hugo theme](https://github.com/google/docsy#readme). Even if you plan to run the website in a container, we strongly recommend pulling in the submodule and other development dependencies by running the following:

```bash
# pull in the Docsy submodule
git submodule update --init --recursive --depth 1
```

To build and test the site locally, run:

```bash
# install dependencies
npm ci
hugo server
```

This will start the local Hugo server on port 1313. Open up your browser to <http://localhost:1313> to view the website. As you make changes to the source files, Hugo updates the website and forces a browser refresh.

## Thank you

The HCX community appreciate your contributions to our website and our documentation!
