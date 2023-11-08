namespace api.Models;

public class Aircraft
{
    public string Id { get; set; }
    public string? TailNumber { get; set; }

    public Aircraft(string id)
    {
        this.Id = id;
    }
}
