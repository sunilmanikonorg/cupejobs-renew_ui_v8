# GitHub Security

- An action can access the GITHUB_TOKEN through the github.token context even if the workflow does not explicitly pass the GITHUB_TOKEN to the action. As a good security practice, you should always make sure that actions only have the minimum access they require by limiting the permissions granted to the GITHUB_TOKEN. For more information, see Permissions for the GITHUB_TOKEN.
- This step generates an artifact attestation for the image, which is an unforgeable statement about where and how it was built. It increases supply chain security for people who consume the image.
```bash
      - name: Generate artifact attestation
        uses: actions/attest-build-provenance@v2
        with:
          subject-name: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME}}
          subject-digest: ${{ steps.push.outputs.digest }}
          push-to-registry: true
```
- Self-hosted runner security
We recommend that you only use self-hosted runners with private repositories. This is because forks of your public repository can potentially run dangerous code on your self-hosted runner machine by creating a pull request that executes the code in a workflow.