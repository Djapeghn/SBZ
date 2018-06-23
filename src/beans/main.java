package beans;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.StatelessKieSession;

public class main {

	public static void main(String[] args) throws ParseException {
		/*FileData fd = new FileData("./WebContent/");
		fd.writeData();*/
		KieServices ks = KieServices.Factory.get();
		KieContainer kContainer = ks.getKieClasspathContainer();
		KieSession kSession = kContainer.newKieSession("ksession-rules");

		/*KieServices kieServices = KieServices.Factory.get();
		KieContainer kieContainer = kieServices.getKieClasspathContainer();
		KieSession kieSession = kieContainer.newKieSession();"ksession-rules"*/
		
    	Double verovatnocaBolesti = 0.0;
    	String najverovatnijaBolest = "";
    	ArrayList<Simptom> simptomss = new ArrayList<Simptom>();
    	simptomss.add(Simptom.CURENJE_IZ_NOSA);
    	simptomss.add(Simptom.BOL_U_GRLU);
    	Korisnik k1 = new Korisnik("test1", "test1", "test1", "test1", new Date(),
    			"test1", "test1", TipKorisnika.Lekar);
    	Bolest b1 = new Bolest("test1", "test1", GrupaBolesti.PRVA, simptomss, simptomss);
    	ArrayList<Sastojak> sastojki = new ArrayList<Sastojak>();
    	sastojki.add(Sastojak.SASTOJAK0);
    	sastojki.add(Sastojak.SASTOJAK1);
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    	Date datum = sdf.parse("1992-07-26");
    	Lek l1 = new Lek("test1", "test1", sastojki, GrupaLekova.ANTIBIOTICI);
    	Pregled p1 = new Pregled("898798", k1, datum,simptomss, b1, l1);
    	HashMap<String, Double> bolestiRules = new HashMap<String,Double>();
    	bolestiRules.put("prehlada", 0.0);
    	bolestiRules.put("groznica", 0.0);
    	bolestiRules.put("upala krajnika", 0.0);
    	bolestiRules.put("sinusna infekcija", 0.0);
    	bolestiRules.put("hipertenzija", 0.0);
    	bolestiRules.put("dijabetes", 0.0);
    	bolestiRules.put("hronicna bubrezna bolest", 0.0);
    	bolestiRules.put("akutna bubrezna povreda", 0.0);
    	
    	
    	//ArrayList<Bolest> b = new ArrayList<Bolest>(getFileData().getBolestValues());
    	
    	if(kSession!=null) {
            kSession.insert(p1);
            kSession.insert(bolestiRules);
            kSession.insert(verovatnocaBolesti);
            //kSession.insert(accountingPeriod);
            kSession.fireAllRules();
    	}
    	else {
    		System.out.println("kita lastina");
    	}

        
        for(String key : bolestiRules.keySet()) {
        	System.out.println(key + " " + bolestiRules.get(key));
        	if(bolestiRules.get(key)>verovatnocaBolesti) {
        		najverovatnijaBolest = key;
        		verovatnocaBolesti = bolestiRules.get(key);
        	}
        }
	}

}
