package com.luv2code.springbbotecommerce.dao;

import com.luv2code.springbbotecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-Category")

public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
