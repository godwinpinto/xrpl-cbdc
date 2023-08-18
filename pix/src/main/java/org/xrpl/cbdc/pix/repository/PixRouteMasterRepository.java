package org.xrpl.cbdc.pix.repository;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import org.xrpl.cbdc.pix.entity.PixRouteMasterEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface PixRouteMasterRepository extends ReactiveCrudRepository<PixRouteMasterEntity,String> {
}
