package co.com.bancolombia.certification.test.interactions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Interaction;

public class PruebaGenerico implements Interaction{

    @Override
    public <T extends Actor> void performAs(T actor) {}

    public static PruebaGenerico pruebaGenerico () {
        return new PruebaGenerico();
    }

}