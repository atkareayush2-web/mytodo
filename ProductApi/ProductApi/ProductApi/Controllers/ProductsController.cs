using Microsoft.AspNetCore.Mvc;
using ProductApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // Fake data store (later we’ll replace with EF Core)
        private static List<Product> _products = new()
        {
            new Product { Id = 1, Name = "Laptop", Category = "Electronics", Price = 50000 },
            new Product { Id = 2, Name = "Shoes", Category = "Fashion", Price = 2500 },
            new Product { Id = 3, Name = "Mobile", Category = "Electronics", Price = 20000 }
        };

        // 1. HTTP GET with Query String
        // Example: GET api/products?category=Electronics
        [HttpGet]
        public IActionResult GetProducts([FromQuery] string? category)
        {
            var result = string.IsNullOrEmpty(category)
                ? _products
                : _products.Where(p => p.Category == category).ToList();

            return Ok(result); // HTTP 200
        }

        // 2. HTTP GET by Id (Route Parameter)
        // Example: GET api/products/1
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound(); // HTTP 404

            return Ok(product); // HTTP 200
        }

        // 3. HTTP POST (Create)
        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            product.Id = _products.Count + 1;
            _products.Add(product);

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            // HTTP 201
        }

        // 4. HTTP PUT (Update)
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound();

            product.Name = updatedProduct.Name;
            product.Category = updatedProduct.Category;
            product.Price = updatedProduct.Price;

            return Ok(product);
        }

        // 5. HTTP DELETE
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound();

            _products.Remove(product);
            return NoContent(); // HTTP 204
        }

        // 6. Using Request Header
        // Example: send header X-Client: Mobile
        [HttpGet("check-client")]
        public IActionResult CheckClient([FromHeader(Name = "X-Client")] string clientType)
        {
            return Ok($"Request came from: {clientType}");
        }
    }
}
