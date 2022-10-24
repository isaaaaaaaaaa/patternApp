using AwsS3.Services;
using AwsS3.Services.Interfaces;
using PatternsAPI.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Dependencies.ConfigureServices(builder.Configuration, builder.Services, builder.Environment.IsDevelopment());
builder.Services.AddControllers(options => {
    options.SuppressAsyncSuffixInActionNames = false;
});
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper((serviceProvider, config) => {
    config.AddGlobalIgnore("CreationDateTime");
    config.AddGlobalIgnore("LastUpdateDateTime");
}, typeof(MappingProfile).Assembly);

builder.Services.AddScoped(typeof(IStorageService), typeof(StorageService));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();
