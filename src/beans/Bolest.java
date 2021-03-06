package beans;

import java.util.ArrayList;

public class Bolest {

	private String idBolest;
	private String naziv;
	private GrupaBolesti grupa;
	private ArrayList<Simptom> opstiSimptomi = new ArrayList<Simptom>();
	private ArrayList<Simptom> specificniSimptomi = new ArrayList<Simptom>();
	public Bolest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Bolest(String idBolest, String naziv, GrupaBolesti grupa, ArrayList<Simptom> opstiSimptomi,
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
	public GrupaBolesti getGrupa() {
		return grupa;
	}
	public void setGrupa(GrupaBolesti grupa) {
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
	@Override
	public String toString() {
		return "Bolest [idBolest=" + idBolest + ", naziv=" + naziv + ", grupa=" + grupa + ", opstiSimptomi="
				+ opstiSimptomi + ", specificniSimptomi=" + specificniSimptomi + "]";
	}
	
	public String toFileString() {
		
		String str = idBolest + "|" + naziv + "|" + grupa + "|";
		StringBuilder sb = new StringBuilder(str);
		
		for (Simptom s : opstiSimptomi) {
			sb.append(s);
			sb.append(":1");
			sb.append(";");
		}
		for (Simptom s : specificniSimptomi) {
			sb.append(s);
			sb.append(":2");
			sb.append(";");
		}
		if(!(opstiSimptomi.isEmpty()) || !(specificniSimptomi.isEmpty())) {
			sb.deleteCharAt(sb.length()-1);
		}
		
		return sb.toString();
		
	}
}
