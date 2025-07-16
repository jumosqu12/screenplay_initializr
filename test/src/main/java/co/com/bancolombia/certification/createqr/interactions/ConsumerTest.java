package co.com.bancolombia.certification.createqr.interactions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Interaction;

public class ConsumerTest implements Interaction{

    @Override
    public <T extends Actor> void performAs(T actor) {}

    public static ConsumerTest consumerTest () {
        return new ConsumerTest();
    }

}