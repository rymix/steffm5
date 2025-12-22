# Deployment Guide

This document contains instructions for setting up and managing deployment secrets for the STEF.FM project.

## GitHub Secrets Required

The project requires two GitHub secrets for automated deployment to Azure:

1. **AZURE_CREDENTIALS** - Service principal credentials for Azure authentication
2. **STEFFM_PUBLISH_PROFILE** - Azure Web App publish profile

## Retrieving Azure Credentials

### Method 1: Via Azure Portal

1. Go to **Azure Active Directory** → **App registrations**
2. Find your existing service principal (e.g., "steffm-github-actions")
3. Click on it to view details
4. Create a **new client secret** (old secrets cannot be viewed again):
   - Go to **Certificates & secrets**
   - Click **New client secret**
   - Add description and set expiration
   - **Copy the secret value immediately** (cannot be retrieved later)
5. Note the following from the app registration Overview page:
   - **Application (client) ID**
   - **Directory (tenant) ID**
6. Get your **Subscription ID**:
   - Go to **Subscriptions** in Azure Portal
   - Copy the **Subscription ID**

Format the JSON secret:
```json
{
  "clientId": "<Application-client-ID>",
  "clientSecret": "<Secret-you-just-created>",
  "subscriptionId": "<Your-subscription-ID>",
  "tenantId": "<Directory-tenant-ID>"
}
```

### Method 2: Via Azure CLI

```bash
# List your service principals
az ad sp list --show-mine --query "[].{name:displayName, appId:appId}"

# Get subscription and tenant info
az account show --query "{subscriptionId:id, tenantId:tenantId}"

# Create new secret for the service principal
az ad sp credential reset --id <app-id-from-above> --append
```

## Retrieving Publish Profile

### Method 1: Via Azure Portal

1. Go to **App Services** in Azure Portal
2. Click on your **"steffm"** web app
3. In the top toolbar, click **"Download publish profile"** or **"Get publish profile"**
4. This downloads a `.PublishSettings` XML file
5. Open the file with a text editor
6. **Copy the entire XML content** - this is your secret value

The file will be named something like: `steffm.PublishSettings`

### Method 2: Via Azure CLI

```bash
# Download the publish profile XML
az webapp deployment list-publishing-profiles \
  --name steffm \
  --resource-group Stef.FM \
  --xml
```

Copy the entire XML output.

## Adding Secrets to GitHub

1. Navigate to: https://github.com/rymix/steffm5/settings/secrets/actions
2. Click **"New repository secret"**
3. Add first secret:
   - **Name**: `AZURE_CREDENTIALS`
   - **Value**: The complete JSON object from above
4. Click **"New repository secret"** again
5. Add second secret:
   - **Name**: `STEFFM_PUBLISH_PROFILE`
   - **Value**: The complete XML content from publish profile

## Secret Usage in Workflows

### AZURE_CREDENTIALS
Used in `.github/workflows/main.yml` for:
- Azure login (lines 58-61)
- Accessing Azure Key Vault secrets (lines 63-68)
- Setting app configuration settings (lines 77-79)

The service principal needs:
- **Contributor** role on the "Stef.FM" resource group
- **Key Vault Secrets User** role on "stef-fm-secrets" Key Vault

### STEFFM_PUBLISH_PROFILE
Used in `.github/workflows/main.yml` for:
- Deploying the application package to Azure Web App (lines 70-75)

## Azure Resources

### Resource Group
- Name: `Stef.FM`
- Contains: Web App, Key Vault, and related resources

### Web App
- Name: `steffm`
- URL: https://steffm.azurewebsites.net

### Key Vault
- Name: `stef-fm-secrets`
- Secrets stored:
  - `NEXTPUBLICDISCOGSAPITOKEN`
  - `JWTSECRET`
  - `NEXTPUBLICAPIURL`

## Granting Key Vault Access

If you need to grant the service principal access to Key Vault:

```bash
# Get the service principal's object ID
az ad sp list --display-name "steffm-github-actions" \
  --query "[0].id" -o tsv

# Grant Key Vault access
az keyvault set-policy --name stef-fm-secrets \
  --object-id <object-id-from-above> \
  --secret-permissions get list
```

## Deployment Workflow

### Develop Branch
- Push to `develop` branch
- GitHub Actions runs: Install → Format → Build → Test
- No deployment (testing only)

### Main Branch (Production)
- Create Pull Request from `develop` to `main`
- Merge PR
- GitHub Actions runs: Install → Format → Build → Test → Deploy
- Automatic deployment to Azure Web App

## Troubleshooting

### Authentication Failures
- Verify service principal credentials are correct
- Check service principal has Contributor role on resource group
- Ensure client secret hasn't expired (recreate if needed)

### Key Vault Access Issues
- Verify service principal has Key Vault Secrets User role
- Check Key Vault access policies include the service principal
- Ensure Key Vault firewall allows GitHub Actions IPs (or is disabled)

### Deployment Failures
- Verify publish profile is current and valid
- Check Web App is running
- Review deployment logs in Azure Portal under Deployment Center

## Security Notes

- **Never commit secrets to the repository**
- Client secrets expire - set calendar reminders to rotate them
- Publish profiles contain passwords - keep them secure
- Use GitHub's secret scanning to detect accidental commits
- Review and audit service principal permissions regularly

## Useful Links

- Azure Portal: https://portal.azure.com
- GitHub Actions: https://github.com/rymix/steffm5/actions
- GitHub Secrets: https://github.com/rymix/steffm5/settings/secrets/actions
- App Service: https://steffm.azurewebsites.net
- Key Vault: https://portal.azure.com/#@/resource/subscriptions/.../resourceGroups/Stef.FM/providers/Microsoft.KeyVault/vaults/stef-fm-secrets

## Maintenance Schedule

### Every 6 Months
- Rotate Azure service principal client secret
- Review and update Key Vault access policies
- Verify deployment workflows are functioning

### Every 12 Months
- Review Azure resource costs and optimization
- Audit GitHub Actions usage and permissions
- Update dependencies and Node.js version
