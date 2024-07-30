Example project to understand all components of dockerfile in detail

definition: Docker Image is an executable package of software that includes everything needed to run an application. This image informs how a container should instantiate, determining which software components will run and how. Docker Container is a virtual environment that bundles application code with all the dependencies required to run the application. The application runs quickly and reliably from one computing environment to another.

Components of Docker Image
The following are the terminologies and components related to Docker Image:

Layers: Immutable filesystem layers stacked to form a complete image.
Base Image: The foundational layer, often a minimal OS or runtime environment.
Dockerfile: A text file containing instructions to build a Docker image.
Image ID: A unique identifier for each Docker image.
Tags: Labels used to manage and version Docker images.


SubCommands of Docker Image
The following are the some of the sub commands that are used with Docker Image:

      Command                                       Description

docker image build          This command is used for building an image from the Dockerfile

docker image history        It is used for knowing the history of the docker image

docker image inspect        It is used for displaying the detailed information on one or more images

docker image prune          It used for removing unused images that are not associated with any containers

docker image save           This command helps in saving the docker images into a tar archived files

docker image tag            It helps in crating a tag to the target image that refers to the source image.