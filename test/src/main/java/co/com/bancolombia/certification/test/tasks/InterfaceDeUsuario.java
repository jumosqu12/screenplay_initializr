package co.com.bancolombia.certification.test.tasks;

import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class InterfaceDeUsuario implements Task {

    public InterfaceDeUsuario() {}

    @Override
    public <T extends Actor> void performAs(T actor){
        actor.attemptsTo(
            Click.on(""),
            Enter.theValue("").into("")
        );
    }

    public static InterfaceDeUsuario interfaceDeUsuario() {
        return instrumented(InterfaceDeUsuario.class);
    }
}