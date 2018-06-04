package beans;

import java.util.ArrayList;

public class Bolest {

	private String idBolest;
	private String naziv;
	private String grupa;
	private ArrayList<Simptom> opstiSimptomi = new ArrayList<Simptom>();
	private ArrayList<Simptom> specificniSimptomi = new ArrayList<Simptom>();
	public Bolest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bolest(String idBolest, String naziv, String grupa, ArrayList<Simptom> opstiSimptomi,
			ArrayList<Simptom> specificniSimptomi) {
		super();
		this.idBolest = idBolest;
		this.naziv = naziv;
		this.grupa = grupa;
		this.opstiSimptomi = opstiSimptomi;
		this.specificniSimptomi = specificniSimptomi;
	}
	public String getIdBolest() {
		return idBolest;
	}
	public void setIdBolest(String idBolest) {
		this.idBolest = idBolest;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public String getGrupa() {
		return grupa;
	}
	public void setGrupa(String grupa) {
		this.grupa = grupa;
	}
	public ArrayList<Simptom> getOpstiSimptomi() {
		return opstiSimptomi;
	}
	public void setOpstiSimptomi(ArrayList<Simptom> opstiSimptomi) {
		this.opstiSimptomi = opstiSimptomi;
	}
	public ArrayList<Simptom> getSpecificniSimptomi() {
		return specificniSimptomi;
	}
	public void setSpecificniSimptomi(ArrayList<Simptom> specificniSimptomi) {
		this.specificniSimptomi = specificniSimptomi;
	}

}
