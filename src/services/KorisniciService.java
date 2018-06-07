package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import beans.*;

@Path("/korisniciData")
public class KorisniciService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@GET
	@Path("/getKorisnici")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Korisnik> getKorisnici() {
		return getFileData().getKorisnikValues();
	}
	
	@POST
	@Path("/addKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addKorisnik(Korisnik k) {
		if(getFileData().usernameExistsKorisnici(k.getKorisnickoIme())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate username\"}").build();
		}
		else if(getFileData().emailExistsKorisnici(k.getEmail())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate email\"}").build();
		}
		getFileData().getKorisnici().put(k.getIdKorisnik(), k);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyKorisnik(Korisnik k) {
		if(getFileData().idExistsKorisnici(k.getIdKorisnik())) {
			getFileData().getKorisnici().put(k.getIdKorisnik(), k);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Korisnik not found\"}").build();
	}
	
	@POST
	@Path("/checkValidity")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response checkValidity(Korisnik k) {
		if(getFileData().loginCheck(k)) {
			return Response.ok().build();
		}
		else {
			return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Korisnik not found\"}").build();
		}
	}
	
	@POST
	@Path("/deleteKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteKorisnik(Korisnik k) {
		if(getFileData().idExistsKorisnici(k.getIdKorisnik())) {
			getFileData().getKorisnici().remove(k.getIdKorisnik());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Korisnik\"}").build();
	}
	
	private FileData getFileData() {
		FileData fileData = (FileData) ctx.getAttribute("fileData");
		if (fileData == null) {
			fileData = new FileData(ctx.getRealPath(""));
			ctx.setAttribute("fileData", fileData);
		} 
		return fileData;
	}
	
	
}
