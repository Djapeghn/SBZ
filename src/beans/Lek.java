package beans;

import java.util.ArrayList;

public class Lek {

	private String idLek;
	private String naziv;
	private ArrayList<Sastojak> sastojci = new ArrayList<Sastojak>();
	private GrupaLekova grupaLekova;
	public Lek() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Lek(String idLek, String naziv, ArrayList<Sastojak> sastojci, GrupaLekova grupaLekova) {
		super();
		this.idLek = idLek;
		this.naziv = naziv;
		this.sastojci = sastojci;
		this.grupaLekova = grupaLekova;
	}
	public String getIdLek() {
		return idLek;
	}
	public void setIdLek(String idLek) {
		this.idLek = idLek;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public ArrayList<Sastojak> getSastojci() {
		return sastojci;
	}
	public void setSastojci(ArrayList<Sastojak> sastojci) {
		this.sastojci = sastojci;
	}
	public GrupaLekova getGrupaLekova() {
		return grupaLekova;
	}
	public void setGrupaLekova(GrupaLekova grupaLekova) {
		this.grupaLekova = grupaLekova;
	}
	@Override
	public String toString() {
		return "Lek [idLek=" + idLek + ", naziv=" + naziv + ", sastojci=" + sastojci + ", grupaLekova=" + grupaLekova
				+ "]";
	}
	
	public String toFileString() {
		
		String str = idLek + "|" + naziv + "|";
		StringBuilder sb = new StringBuilder(str);
		
		for (Sastojak s : sastojci) {
			sb.append(s);
			sb.append(";");
		}
		if(!(sastojci.isEmpty())) {
			sb.deleteCharAt(sb.length()-1);
		}
		sb.append("|");
		sb.append(grupaLekova);
		
		return sb.toString();
		
	}

	
}
