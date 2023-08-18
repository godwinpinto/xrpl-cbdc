package org.xrpl.cbdc.pix.utils;

import org.xrpl.cbdc.pix.exception.NonFatalException;
import org.xrpl.cbdc.pix.json.GenericResponse;
import reactor.core.publisher.Mono;

public class ExceptionConstants {


    public static NonFatalException NO_ACCOUNTS_FOUND=new NonFatalException(1000, "No Accounts Found");

    public static NonFatalException PIX_ID_NOT_AVAILABLE=new NonFatalException(1001, "PIX ID already taken");

    public static NonFatalException PIX_ID_NOT_FOUND=new NonFatalException(1003, "PIX ID not found");

    public static NonFatalException XRPL_ACCOUNT_DOES_NOT_EXISTS=new NonFatalException(1002, "XRPL account number does not exists");
}
