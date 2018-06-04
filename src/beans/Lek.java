package beans;

import java.util.ArrayList;

public class Lek {

	private String idLek;
	private String naziv;
	private ArrayList<Sastojak> sastojci = new ArrayList<Sastojak>();
	private String grupaLekova;
	public Lek() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Lek(String idLek, String naziv, ArrayList<Sastojak> sastojci, String grupaLekova) {
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
	public String getGrupaLekova() {
		return grupaLekova;
	}
	public void setGrupaLekova(String grupaLekova) {
		this.grupaLekova = grupaLekova;
	}

	
}
