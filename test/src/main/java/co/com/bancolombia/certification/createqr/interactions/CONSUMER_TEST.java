package co.com.bancolombia.certification.createqr.interactions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Interaction;

public class CONSUMER_TEST implements Interaction{

    @Override
    public <T extends Actor> void performAs(T actor) {}

    public static CONSUMER_TEST cONSUMER_TEST () {
        return new CONSUMER_TEST();
    }

}