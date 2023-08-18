package org.xrpl.cbdc.pix.component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.xrpl.cbdc.pix.entity.PixRouteMasterEntity;
import org.xrpl.cbdc.pix.repository.PixRouteMasterRepository;
import org.xrpl.cbdc.pix.utils.ApplicationConstants;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.concurrent.ConcurrentHashMap;

@Configuration
@Slf4j
public class PixRouteMasterRefreshConfig {

    @Autowired
    PixRouteMasterRepository pixRouteMasterRepository;

    private ConcurrentHashMap<String, PixRouteMasterEntity> concurrentHashMap;

    public PixRouteMasterRefreshConfig(){
        concurrentHashMap=new ConcurrentHashMap<>();
    }

    @Scheduled(initialDelay = 0L, fixedRate = 60*1000L)
    public void refreshRouteConfig(){
        log.info("Reloading");
        Flux<PixRouteMasterEntity> routes=pixRouteMasterRepository.findAll()
                .flatMap(entity -> {
                    if(entity.getActive().equals(ApplicationConstants.ACTIVE)) {
                        concurrentHashMap.put(entity.getRpayCode() + entity.getCbdcCountryCode(), entity);
                    }else{
                        concurrentHashMap.remove(entity.getRpayCode() + entity.getCbdcCountryCode());
                    }
                    return Mono.just(entity);
        });
        routes.subscribe();
    }

    public Mono<PixRouteMasterEntity> getRoute(String rpayCode,String cbdcCountryCode){
        if(concurrentHashMap!=null && !concurrentHashMap.isEmpty() && concurrentHashMap.contains(rpayCode.trim()+cbdcCountryCode.trim())) {
            return Mono.just(concurrentHashMap.get(rpayCode.trim() + cbdcCountryCode.trim()));
        }else {
            return Mono.empty();
        }
    }

}
