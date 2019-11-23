package com.example.helloworld.resources;

import com.codahale.metrics.annotation.Timed;
import com.example.helloworld.api.Saying;
import com.example.helloworld.api.PlayersList;
import com.example.helloworld.core.Template;

import io.dropwizard.jersey.caching.CacheControl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
public class PlayersResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlayersResource.class);

    private final String message;
    private final String firstParameter;
    private final String secondParameter;


    public PlayersResource(Template template) {
        this.message = "";
        this.firstParameter = "";
        this.secondParameter = "";
    }

    public PlayersResource(String message, String firstParameter, String secondParameter) {
        this.message = message;
        this.firstParameter = firstParameter;
        this.secondParameter = secondParameter;
    }

    @GET
    @Timed(name = "get-requests")
    @CacheControl(maxAge = 1, maxAgeUnit = TimeUnit.DAYS)
    //public Representation getMessage(@QueryParam("first") Optional<String> first, @QueryParam("second") Optional<String> second) {
    //    final String value = String.format(message, first.or(firstParameter), second.or(secondParameter));
    //    return new Representation(value);
    public PlayersList sayHello(@QueryParam("name") Optional<String> name) {
        return new PlayersList(1, "Name");
    }
    
}
