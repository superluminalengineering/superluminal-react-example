
export const exampleSchema = {
    "columns": [ "Order ID", "Product", "Quantity Ordered", "Price Each", "Order Date", "Purchase Address" ],
    "validation_level": "minimal",
    "schema": {
        "type": "object",
        "description": "Orders for our web shop.",
        "properties": {
            "Order ID": {
                "type": "number",
            },
            "Product": {
                "type": "string",
                "description": "The name of the product that was ordered."
            },
            "Quantity Ordered": {
                "type": "number",
            },
            "Price Each": {
                "type": "number",
                "description": "The unit price of the product ordered, in USD."
            },
            "Order Date": {
                "type": "string",
                "description": "The date and time the order was placed, formatted as MM/DD/YY HH:MM."
            },
            "Purchase Address": {
                "type": "string",
                "description": "The customer's address."
            },
        },
        "required": []
    }
}