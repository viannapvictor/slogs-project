namespace SlogsProject.Core.Response;

public sealed class ResultResponse<T> where T : class
{
    public ResultResponse(T result)
    {
        Result = result;
    }

    public T Result { get; }
}