package org.xrpl.cbdc.pix.component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.xrpl.cbdc.pix.entity.PixRouteMasterEntity;
import org.xrpl.cbdc.pix.repository.PixRouteMasterRepository;
import org.xrpl.cbdc.pix.utils.ApplicationConstants;
import org.xrpl.cbdc.pix.utils.ApplicationUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.concurrent.ConcurrentHashMap;

@Configuration
@Slf4j
public class PixRouteMasterRefreshConfig {

    @Autowired
    PixRouteMasterRepository pixRouteMasterRepository;


    public PixRouteMasterRefreshConfig(){

    }

    @Scheduled(initialDelay = 0L, fixedRate = 60*1000L)
    public void refreshRouteConfig(){
        log.info("Reloading");
        Flux<PixRouteMasterEntity> routes=pixRouteMasterRepository.findAll()
                .flatMap(entity -> {
                    System.out.println(entity.toString());
                    if(entity.getActive().equals(ApplicationConstants.ACTIVE)) {
                        System.out.println("TRUE AGAIN");
                        ApplicationUtils.ROUTE_MAP.put(entity.getRpayCode() + entity.getCbdcCountryCode(), entity);
                    }else{
                        System.out.println("FALSE AGAIN");
                        ApplicationUtils.ROUTE_MAP.remove(entity.getRpayCode() + entity.getCbdcCountryCode());
                    }
                    return Mono.just(entity);
        });
        routes.subscribe();
    }

    public Mono<PixRouteMasterEntity> getRoute(String rpayCode,String cbdcCountryCode){
        System.out.println(rpayCode.trim()+cbdcCountryCode.trim());
        if(ApplicationUtils.ROUTE_MAP!=null && !ApplicationUtils.ROUTE_MAP.isEmpty() && ApplicationUtils.ROUTE_MAP.get(rpayCode.trim()+cbdcCountryCode.trim())!=null) {
            System.out.println("TRUE");
            return Mono.just(ApplicationUtils.ROUTE_MAP.get(rpayCode.trim() + cbdcCountryCode.trim()));
        }else {
            System.out.println("FALSE");
            return Mono.empty();
        }
    }

}
