package co.com.bancolombia.certification.createqr.runners.prueba;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/.../",
        glue = "co.com.bancolombia.certification.createqr.stepdefinitions",
        snippets = CucumberOptions.SnippetType.CAMELCASE
)
public class FeaturePrueba {}