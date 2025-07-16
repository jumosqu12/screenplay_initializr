package co.com.bancolombia.certification.createqr.tasks;

import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class ConsumerService implements Task {

    public ConsumerService() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Click.on(""),
            Enter.theValue("").into("")
        );
    }

    public static ConsumerService consumerService() {
        return instrumented(ConsumerService.class);
    }
}