namespace SlogsProject.Core.Response;

public readonly struct ErrorType
{
    private ErrorType(string errorType)
    {
        _errorType = errorType;
    }

    private readonly string _errorType;

    public static readonly ErrorType Unknown = new(nameof(Unknown));
    public static readonly ErrorType IncorrectEmailOrPassword = new(nameof(IncorrectEmailOrPassword));
    public static readonly ErrorType InvalidForm = new(nameof(InvalidForm));
    public static readonly ErrorType InvalidOrganization = new(nameof(InvalidOrganization));
    public static readonly ErrorType InsufficientPermission = new(nameof(InsufficientPermission));

    public override readonly string ToString() => _errorType;
}