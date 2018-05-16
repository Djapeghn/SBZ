package beans;

import java.util.ArrayList;

public class Bolest {

	private String naziv;
	private GrupaBolesti grupa;
	private ArrayList<Simptom> simptomi = new ArrayList<Simptom>();
	public Bolest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bolest(String naziv, GrupaBolesti grupa, ArrayList<Simptom> simptomi) {
		super();
		this.naziv = naziv;
		this.grupa = grupa;
		this.simptomi = simptomi;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public GrupaBolesti getGrupa() {
		return grupa;
	}
	public void setGrupa(GrupaBolesti grupa) {
		this.grupa = grupa;
	}
	public ArrayList<Simptom> getSimptomi() {
		return simptomi;
	}
	public void setSimptomi(ArrayList<Simptom> simptomi) {
		this.simptomi = simptomi;
	}
	
}
