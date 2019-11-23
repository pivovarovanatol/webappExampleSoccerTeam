package com.example.helloworld.core;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "players")
@NamedQueries(
    {
        @NamedQuery(
            name = "com.example.helloworld.core.Player.findAll",
            query = "SELECT p FROM Player p"
        )
    })
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private long number;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "pos", nullable = false)
    private String pos;

    public Player() {
    }

    public Player(long number, String name, String pos) {
        this.number = number;
        this.name = name;
        this.pos = pos;
    }

    public long getId() {
        return number;
    }

    public void setId(long number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setlName(String name) {
        this.name = name;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }

        final Player that = (Player) o;

        return Objects.equals(this.number, that.number) &&
                Objects.equals(this.name, that.name) &&
                Objects.equals(this.pos, that.pos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number, name, pos);
    }
}
