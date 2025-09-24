package co.com.bancolombia.certificacion.prueba.interactions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Interaction;

public class Interac implements Interaction{

    @Override
    public <T extends Actor> void performAs(T actor) {}

    public static Interac interac () {
        return new Interac();
    }

}