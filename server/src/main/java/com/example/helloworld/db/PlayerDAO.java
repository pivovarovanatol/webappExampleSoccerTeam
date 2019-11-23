package com.example.helloworld.db;

import com.example.helloworld.core.Player;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

import java.util.List;
import java.util.Optional;

public class PlayerDAO extends AbstractDAO<Player> {
    public PlayerDAO(SessionFactory factory) {
        super(factory);
    }

    public Optional<Player> findById(Long id) {
        return Optional.ofNullable(get(id));
    }

    public Player create(Player player) {
        return persist(player);
    }

    public List<Player> findAll() {
        return list(namedQuery("com.example.helloworld.core.Player.findAll"));
    }
}
