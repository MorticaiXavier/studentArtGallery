package com.brewing.dudeling.gallery.repository;

import com.brewing.dudeling.gallery.domain.Album;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Album entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("select album from Album album where album.user.login = ?#{principal.username}")
    List<Album> findByUserIsCurrentUser();
}
