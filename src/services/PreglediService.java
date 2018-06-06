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

@Path("/preglediData")
public class PreglediService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@GET
	@Path("/getPregledi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Pregled> getPregledi() {
		return getFileData().getPregledValues();
	}
	
	@POST
	@Path("/addPregled")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addPregled(Pregled p) {
		if(getFileData().idExistsPregledi(p.getIdPregleda())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate id\"}").build();
		}
		getFileData().getPregledi().put(p.getIdPregleda(), p);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyPregled")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyPregled(Pregled p) {
		if(getFileData().idExistsPregledi(p.getIdPregleda())) {
			getFileData().getPregledi().put(p.getIdPregleda(), p);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Pregled not found\"}").build();
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
