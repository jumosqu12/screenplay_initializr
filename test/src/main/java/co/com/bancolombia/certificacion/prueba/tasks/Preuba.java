package co.com.bancolombia.certificacion.prueba.tasks;

import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Preuba implements Task {

    public Preuba() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Click.on(""),
            Enter.theValue("").into("")
        );
    }

    public static Preuba preuba() {
        return instrumented(Preuba.class);
    }
}