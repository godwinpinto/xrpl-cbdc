package org.xrpl.cbdc.pix.component;


import de.mkammerer.snowflakeid.SnowflakeIdGenerator;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
@Component
public class GenerateUniqueId {

    SnowflakeIdGenerator generator;

    @Value("${pix.instance-id}")
    public int instanceId;

    public GenerateUniqueId(){
        generator = SnowflakeIdGenerator.createDefault(instanceId);
    }

    public long getId(){
        return generator.next();
    }
}
