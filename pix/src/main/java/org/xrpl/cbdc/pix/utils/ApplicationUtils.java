package org.xrpl.cbdc.pix.utils;

import java.sql.Timestamp;
import java.time.Instant;

public class ApplicationUtils {

    public static Timestamp getCurrentDateTime(){
        Instant currentUTC = Instant.now();
        return Timestamp.from(currentUTC);
    }
}
