namespace SlogsProject.Core.Response;

public sealed class ErrorResponse
{
    public ErrorResponse(ErrorType error)
    {
        Error = error.ToString();
    }

    public string Error { get; }
}