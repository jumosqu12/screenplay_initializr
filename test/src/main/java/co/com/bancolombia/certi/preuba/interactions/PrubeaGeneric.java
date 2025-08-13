package co.com.bancolombia.certi.preuba.interactions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Interaction;

public class PrubeaGeneric implements Interaction{

    @Override
    public <T extends Actor> void performAs(T actor) {}

    public static PrubeaGeneric prubeaGeneric () {
        return new PrubeaGeneric();
    }

}