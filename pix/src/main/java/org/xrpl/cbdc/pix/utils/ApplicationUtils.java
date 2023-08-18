package org.xrpl.cbdc.pix.utils;

import org.xrpl.cbdc.pix.entity.PixRouteMasterEntity;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;

public class ApplicationUtils {

    public static ConcurrentHashMap<String, PixRouteMasterEntity> ROUTE_MAP=new ConcurrentHashMap<>();;

    public static Timestamp getCurrentDateTime(){
        Instant currentUTC = Instant.now();
        return Timestamp.from(currentUTC);
    }
}
