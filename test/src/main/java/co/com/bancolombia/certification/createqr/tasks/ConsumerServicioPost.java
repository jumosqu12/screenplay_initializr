package co.com.bancolombia.certification.createqr.tasks;

import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class ConsumerServicioPost implements Task {

    public ConsumerServicioPost() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Click.on(""),
            Enter.theValue("").into("")
        );
    }

    public static ConsumerServicioPost consumerServicioPost() {
        return instrumented(ConsumerServicioPost.class);
    }
}