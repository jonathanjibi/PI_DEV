package com.esprit.spring.services;

import java.util.List;

import com.esprit.spring.entites.StockDetail;

public interface IStockDetailService {
	
	public void  addStockDetail(StockDetail stockDetail);
	public void  deleteStockDetailById(int id);
	public StockDetail  updatestockDetail(StockDetail stock);
	public StockDetail getStockDetailById(int id);
	public Iterable<StockDetail> getAllStockDetail();
	public void deleteAllStockDetail();
	public StockDetail affectationProduitDansStockDetail(int idProd, int idStock);
	//public StockDetail desaffectationProduit(int idProd, int idStock);
	public void sendnotif(int idStockD);
	public int descrementStock(int idStockdetail,int nBrProduct);
	public List<StockDetail> sendnotifProductExpiration();

}
