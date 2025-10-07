using System;

namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool isCancelled { get; set; }

    // location props 

    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}





/* 
public string Id { get; set; } = Guid.NewGuid().ToString();

The Guid part refers to the System.Guid struct in .NET, which represents a Globally Unique Identifier — basically, 
a 128-bit value that's (for all practical purposes) guaranteed to be unique.

Guid.NewGuid() basically creates a brand new unique identifier such as 3f7c98f5-9a6b-4b3e-8d5f-4ed8c8c03e42

Using Guid ensures each object has a unique id without relying on the database to generate one. so in this case, each Id will be different.
we could do it like this   public Guid Id { get; set; }   but strings are just easier to work with so declare as a string and just convert it with ToString()
*/ 