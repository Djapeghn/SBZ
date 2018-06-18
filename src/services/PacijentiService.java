package services;

import java.io.UnsupportedEncodingException;
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

@Path("/pacijentiData")
public class PacijentiService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@GET
	@Path("/getPacijenti")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Pacijent> getPacijenti() {
		return getFileData().getPacijentValues();
	}
	
	@POST
	@Path("/addPacijent")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addPacijent(Pacijent pac) {
		if(getFileData().idExistsPacijenti(pac.getIdPacijent())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate id\"}").build();
		}
		getFileData().getPacijenti().put(pac.getIdPacijent(), pac);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyPacijent")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyPacijent(Pacijent pac) {
		if(getFileData().idExistsPacijenti(pac.getIdPacijent())) {
			getFileData().getPacijenti().put(pac.getIdPacijent(), pac);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Pacijent not found\"}").build();
	}
	
	@POST
	@Path("/deletePacijent")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deletePacijent(Pacijent p) {
		if(getFileData().idExistsPacijenti(p.getIdPacijent())) {
			getFileData().getPacijenti().remove(p.getIdPacijent());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Pacijent\"}").build();
	}
	
	private FileData getFileData() {
		FileData fileData = (FileData) ctx.getAttribute("fileData");
		if (fileData == null) {
			//fileData = new FileData(ctx.getRealPath(""));
			try {
				fileData = new FileData();
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ctx.setAttribute("fileData", fileData);
		} 
		return fileData;
	}
	
	
}
