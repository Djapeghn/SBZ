package beans;

import java.util.ArrayList;

public class Lek {

	private String naziv;
	private ArrayList<Sastojak> sastojci = new ArrayList<Sastojak>();
	private GrupaLekova grupaLekova;
	public Lek() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Lek(String naziv, ArrayList<Sastojak> sastojci, GrupaLekova grupaLekova) {
		super();
		this.naziv = naziv;
		this.sastojci = sastojci;
		this.grupaLekova = grupaLekova;
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
	
	
}
