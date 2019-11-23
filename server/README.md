# Running The Server

To run the server use the following commands.

* To compile and package the code:

        mvn package

* To populate the database (You should only have to do this the first time):

        java -jar target/appneta-dropwizard-1.0.0.jar db migrate example.yml

* To run the server:

        java -jar target/appneta-dropwizard-1.0.0.jar server example.yml

* To hit the Hello World example (You might have to hit refresh a few times):

	http://localhost:8080/hello-world

After making code changes, kill the server process (CTRL+c) and run the first and third steps again. For debugging, logs will be written to the console.

You can also execute the supplied `run.sh` script (This does not populate the DB).
