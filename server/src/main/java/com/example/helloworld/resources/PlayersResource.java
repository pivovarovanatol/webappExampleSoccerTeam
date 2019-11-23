package com.example.helloworld.resources;

import com.codahale.metrics.annotation.Timed;
import com.example.helloworld.api.Saying;
import com.example.helloworld.api.PlayersList;
import com.example.helloworld.core.Template;
import com.example.helloworld.core.Player;
import com.example.helloworld.db.PlayerDAO;

import io.dropwizard.hibernate.UnitOfWork;
import io.dropwizard.jersey.caching.CacheControl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
public class PlayersResource {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlayersResource.class);
    private PlayerDAO playerDao;
    private final Template template;
    //private final AtomicLong counter;

    public void setDAO(PlayerDAO dao) {
        this.playerDao = dao;
    }

    public PlayersResource(Template template) {
        this.template = template;
    }

    public PlayersResource(Template template, PlayerDAO dao) {
        this.template = template;
        setDAO(dao);
    }


    @GET
    @Timed(name = "get-requests")
    @CacheControl(maxAge = 1, maxAgeUnit = TimeUnit.DAYS)
    @UnitOfWork
    public List<Player> getPlayers(@QueryParam("playerId") Optional<Long> playerId) {
        
        LOGGER.info("==== Calling method getPlayers with parameters: " +
                    playerId.toString());

        if (this.playerDao != null && !playerId.isPresent()){
            List<Player> players = playerDao.findAll();
            return players;
        }
        if (this.playerDao != null && playerId.isPresent()){
            long id = 0l;
            if (playerId.isPresent()){
                id = playerId.get();
            }
            Optional<Player> player= playerDao.findById(id);
            List<Player> players = new ArrayList<Player>();
            if (player.isPresent()) {
                players.add(player.get());
            } 
            return players;
        }
        
        return null;
    }
    
}
